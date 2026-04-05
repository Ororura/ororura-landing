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

type ToneOptions = {
  delay?: number;
  duration: number;
  from: number;
  gainValue: number;
  to: number;
  type: OscillatorType;
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
    { oscillator: audioContext.createOscillator(), gain: audioContext.createGain() },
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
    drones,
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

  const scheduleTone = (audioContext: AudioContext, { delay = 0, duration, from, gainValue, to, type }: ToneOptions) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const startTime = audioContext.currentTime + delay;

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(from, startTime);
    oscillator.frequency.exponentialRampToValueAtTime(to, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration + 0.03);

    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  };

  const playSequence = async (tones: ToneOptions[], bypassState = false) => {
    const audioContext = await ensureAudioContext();

    if (!audioContext || (!soundEnabled && !bypassState)) {
      return;
    }

    tones.forEach((tone) => {
      scheduleTone(audioContext, tone);
    });
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

  const playHover = async () => {
    const now = Date.now();

    if (now - hoverAtRef.current < 120) {
      return;
    }

    hoverAtRef.current = now;

    await playSequence([
      {
        duration: 0.06,
        from: 240,
        gainValue: 0.006,
        to: 212,
        type: "sine",
      },
    ]);
  };

  const playClick = async () => {
    await playSequence([
      {
        duration: 0.11,
        from: 520,
        gainValue: 0.018,
        to: 172,
        type: "triangle",
      },
      {
        delay: 0.02,
        duration: 0.08,
        from: 260,
        gainValue: 0.006,
        to: 200,
        type: "sine",
      },
    ]);
  };

  const playSelect = async () => {
    await playSequence([
      {
        duration: 0.05,
        from: 260,
        gainValue: 0.006,
        to: 310,
        type: "triangle",
      },
      {
        delay: 0.04,
        duration: 0.08,
        from: 310,
        gainValue: 0.007,
        to: 260,
        type: "sine",
      },
    ]);
  };

  const playFilter = async () => {
    await playSequence([
      {
        duration: 0.05,
        from: 210,
        gainValue: 0.006,
        to: 250,
        type: "square",
      },
      {
        delay: 0.04,
        duration: 0.06,
        from: 320,
        gainValue: 0.005,
        to: 190,
        type: "triangle",
      },
    ]);
  };

  const playNavigate = async () => {
    await playSequence([
      {
        duration: 0.08,
        from: 280,
        gainValue: 0.009,
        to: 420,
        type: "triangle",
      },
      {
        delay: 0.05,
        duration: 0.16,
        from: 420,
        gainValue: 0.012,
        to: 190,
        type: "sine",
      },
    ]);
  };

  const playBootStep = async (stepIndex: number) => {
    const baseFrequency = [240, 270, 300, 330, 360][stepIndex % 5];

    await playSequence([
      {
        duration: 0.045,
        from: baseFrequency,
        gainValue: 0.0048,
        to: baseFrequency * 0.94,
        type: "triangle",
      },
    ]);
  };

  const toggleSound = async () => {
    const nextEnabled = !soundEnabled;

    if (nextEnabled) {
      setSoundEnabled(true);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("archive.sound.enabled", "true");
      }

      await enableHum();
      await playSequence(
        [
          {
            duration: 0.08,
            from: 180,
            gainValue: 0.01,
            to: 280,
            type: "triangle",
          },
          {
            delay: 0.05,
            duration: 0.12,
            from: 280,
            gainValue: 0.012,
            to: 420,
            type: "sine",
          },
        ],
        true,
      );

      return;
    }

    await playSequence(
      [
        {
          duration: 0.06,
          from: 260,
          gainValue: 0.008,
          to: 190,
          type: "triangle",
        },
        {
          delay: 0.03,
          duration: 0.1,
          from: 190,
          gainValue: 0.006,
          to: 120,
          type: "sine",
        },
      ],
      true,
    );

    setSoundEnabled(false);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("archive.sound.enabled", "false");
    }

    await disableHum();
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
    playBootStep,
    playClick,
    playFilter,
    playHover,
    playNavigate,
    playSelect,
    soundEnabled,
    toggleSound,
  };
};

export { useShrineAudio };
