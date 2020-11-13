import pyttsx3
import pyaudio
import wave


class AudioManager:
	__intro_sound_path = 'assets/job-done-501.wav'
	__outro__sound_path = 'assets/job-done-501.wav'

	def __init__(self):
		self.engine = pyttsx3.init()

	def say(self, text):
		self.engine.say(text)
		self.engine.runAndWait()

	def play_intro(self):
		self.__play_sound(self.__intro_sound_path)

	def play_outro(self):
		self.__play_sound(self.__outro__sound_path)

	def __play_sound(self, file_path):
		chunk = 1024
		wf = wave.open(file_path, 'rb')
		pa = pyaudio.PyAudio()

		stream = pa.open(
			format=pa.get_format_from_width(wf.getsampwidth()),
			channels=wf.getnchannels(),
			rate=wf.getframerate(),
			output=True
		)

		data_stream = wf.readframes(chunk)

		while data_stream:
			stream.write(data_stream)
			data_stream = wf.readframes(chunk)

		stream.close()
		pa.terminate()

