// Musical Note Player
class NotePlayer {
    constructor() {
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Map of note names to frequencies
    getNoteFrequency(noteName) {
        const notes = {
            'C': 261.63, 'D': 293.66, 'E': 329.63, 
            'F': 349.23, 'G': 392.00, 'A': 440.00, 
            'B': 493.88
        };
        return notes[noteName.toUpperCase()] || 440; // Default to A if not found
    }

    // Play a single note
    playNote(noteName, duration = 0.5) {
        const oscillator = this.audioContext.createOscillator();
        oscillator.type = 'square';
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(this.getNoteFrequency(noteName), this.audioContext.currentTime);

        // Create soft attack and release
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.9, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    // Play a sequence of notes
    playSequence(notes, duration = 0.5) {
        notes.forEach((note, index) => {
            setTimeout(() => {
                this.playNote(note, duration);
            }, index * (duration * 1000));
        });
    }

    // Play word by converting letters to notes (A=A, B=B, etc.)
    playWord(word) {
        const notes = word.toUpperCase().split('').map(letter => {
            // Map letters to notes (A->A, B->B, etc.)
            return /[A-G]/.test(letter) ? letter : 'A';
        });
        this.playSequence(notes);
    }
}