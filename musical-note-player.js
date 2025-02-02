class NotePlayer {
    constructor() {
        // Create a polyphonic synthesizer with slightly more piano-like settings
        this.synth = new Tone.PolySynth(Tone.Synth, {
            oscillator: {
                type: "triangle"
            },
            envelope: {
                attack: 0.02,
                decay: 0.2,
                sustain: 0.22,
                release: 0.75
            }
        }).toDestination();

        // Adjust volume
        this.synth.volume.value = -8;
    }

    // Map of note names to frequencies (kept for reference)
    getNoteFrequency(noteName) {
        const notes = {
            'C': 261.63, 'D': 293.66, 'E': 329.63, 
            'F': 349.23, 'G': 392.00, 'A': 440.00, 
            'B': 493.88
        };
        return notes[noteName.toUpperCase()] || 440;
    }

    // Play a single note
    async playNote(noteName, duration = 0.5) {
        await Tone.start();
        // Add "4" to specify middle octave
        this.synth.triggerAttackRelease(`${noteName}4`, duration);
    }

    // Play a sequence of notes
    async playSequence(notes, duration = 0.5) {
        await Tone.start();
        const now = Tone.now();
        notes.forEach((note, index) => {
            this.synth.triggerAttackRelease(
                `${note}4`, 
                duration, 
                now + (index * duration)
            );
        });
    }

    // Play word by converting letters to notes (A=A, B=B, etc.)
    async playWord(word) {
        const notes = word.toUpperCase().split('').map(letter => {
            // Map letters to notes (A->A, B->B, etc.)
            return /[A-G]/.test(letter) ? letter : 'A';
        });
        await this.playSequence(notes);
    }
}