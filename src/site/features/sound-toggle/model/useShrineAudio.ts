"use client";

import { useEffect, useRef, useState } from "react";

type DroneNode = {
  gain: GainNode;
  oscillator: OscillatorNode;
};

type HumNodes = {
  bed: GainNode;
  filter: BiquadFilterNode;
  master: GainNode;
  sway: GainNode;
  swayOscillator: OscillatorNode;
  drones: DroneNode[];
};

const createHum = (audioContext: AudioContext) => {
  const master = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  const bed = audioContext.createGain();
  const swayOscillator = audioContext.createOscillator();
  const sway = audioContext.createGain();

  master.gain.value = 0;
  filter.type = "lowpass";
  filter.frequency.value = 420;
  filter.Q.value = 0.65;
  bed.gain.value = 0.76;
  swayOscillator.type = "sine";
  swayOscillator.frequency.value = 0.11;
  sway.gain.value = 0.08;

  swayOscillator.connect(sway);
  sway.connect(bed.gain);
  bed.connect(filter);
  filter.connect(master);
  master.connect(audioContext.destination);

  const drones: DroneNode[] = [
    { oscillator: audioContext.createOscillator(), gain: audioContext.createGain() },
    { oscillator: audioContext.createOscillator(), gain: audioContext.createGain() },
    { oscillator: audioContext.createOscillator(), gain: audioContext.createGain() }
  ];

  drones[0].oscillator.type = "triangle";
  drones[0].oscillator.frequency.value = 43;
  drones[0].gain.gain.value = 0.02;

  drones[1].oscillator.type = "sine";
  drones[1].oscillator.frequency.value = 87;
  drones[1].gain.gain.value = 0.013;

  drones[2].oscillator.type = "sine";
  drones[2].oscillator.frequency.value = 132;
  drones[2].gain.gain.value = 0.006;

  drones.forEach((drone) => {
    drone.oscillator.connect(drone.gain);
    drone.gain.connect(bed);
    drone.oscillator.start();
  });

  swayOscillator.start();

  return {
    bed,
    filter,
    master,
    sway,
    swayOscillator,
    drones
  };
};

const stopHum = (hum: HumNodes) => {
  hum.drones.forEach((drone) => {
    drone.oscillator.stop();
    drone.oscillator.disconnect();
    drone.gain.disconnect();
  });

  hum.swayOscillator.stop();
  hum.swayOscillator.disconnect();
  hum.sway.disconnect();
  hum.bed.disconnect();
  hum.filter.disconnect();
  hum.master.disconnect();
};

const useShrineAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const hoverAtRef = useRef(0);
  const humRef = useRef<HumNodes | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const ensureAudioContext = async () => {
    if (typeof window === "undefined" || typeof window.AudioContext === "undefined") {
      return null;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new window.AudioContext();
    }

    if (audioContextRef.current.state === "suspended") {
      try {
        await audioContextRef.current.resume();
      } catch {
        return audioContextRef.current;
      }
    }

    return audioContextRef.current;
  };

  const playTone = async ({
    bypassState = false,
    duration,
    from,
    gainValue,
    to,
    type
  }: {
    bypassState?: boolean;
    duration: number;
    from: number;
    gainValue: number;
    to: number;
    type: OscillatorType;
  }) => {
    const audioContext = await ensureAudioContext();

    if (!audioContext || (!soundEnabled && !bypassState)) {
      return;
    }

    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(to, audioContext.currentTime + duration);

    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, audioContext.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration + 0.03);

    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  };

  const enableHum = async () => {
    const audioContext = await ensureAudioContext();

    if (!audioContext) {
      return;
    }

    if (!humRef.current) {
      humRef.current = createHum(audioContext);
    }

    humRef.current.master.gain.cancelScheduledValues(audioContext.currentTime);
    humRef.current.master.gain.setValueAtTime(humRef.current.master.gain.value, audioContext.currentTime);
    humRef.current.master.gain.linearRampToValueAtTime(0.06, audioContext.currentTime + 0.8);
  };

  const disableHum = async () => {
    const audioContext = await ensureAudioContext();

    if (!audioContext || !humRef.current) {
      return;
    }

    humRef.current.master.gain.cancelScheduledValues(audioContext.currentTime);
    humRef.current.master.gain.setValueAtTime(humRef.current.master.gain.value, audioContext.currentTime);
    humRef.current.master.gain.linearRampToValueAtTime(0.0001, audioContext.currentTime + 0.35);
  };

  const toggleSound = async () => {
    const nextEnabled = !soundEnabled;

    setSoundEnabled(nextEnabled);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("archive.sound.enabled", nextEnabled ? "true" : "false");
    }

    if (nextEnabled) {
      await enableHum();
      await playTone({
        bypassState: true,
        duration: 0.09,
        from: 310,
        gainValue: 0.016,
        to: 180,
        type: "triangle"
      });
      return;
    }

    await disableHum();
  };

  const playHover = async () => {
    const now = Date.now();

    if (now - hoverAtRef.current < 120) {
      return;
    }

    hoverAtRef.current = now;

    await playTone({
      duration: 0.06,
      from: 240,
      gainValue: 0.006,
      to: 212,
      type: "sine"
    });
  };

  const playClick = async () => {
    await playTone({
      duration: 0.11,
      from: 520,
      gainValue: 0.022,
      to: 172,
      type: "triangle"
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedValue = window.localStorage.getItem("archive.sound.enabled");

    if (storedValue === "true") {
      setSoundEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!soundEnabled) {
      return;
    }

    void enableHum();
  }, [soundEnabled]);

  useEffect(() => {
    return () => {
      if (humRef.current) {
        stopHum(humRef.current);
      }

      if (audioContextRef.current) {
        void audioContextRef.current.close();
      }
    };
  }, []);

  return {
    playClick,
    playHover,
    soundEnabled,
    toggleSound
  };
};

export { useShrineAudio };
