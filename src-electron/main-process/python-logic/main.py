import pyglet
import speech_recognition as sr
from scripts.message_protocol import Message, Types as MSG_Types  # noqa
from scripts.audio_manager import AudioManager  # noqa
from scripts.language_processor import dumb_lp  # noqa

channel = Message()
mouth = AudioManager()
r = sr.Recognizer()


def initSpeech():
	mouth.play_intro()
	print('Listening...')
	try:
		with sr.Microphone() as mic:
			print('\nsay something...')
			audio = r.listen(mic, timeout=2.5)
	except:
		mouth.say('Were you speaking?')
	mouth.play_outro()

	command = ''

	try:
		command = r.recognize_google(audio)
	except:
		mouth.say("Couldn't Understand You!")
		print("Couldn't Understand You!")
		exit(1)
		return

	print(channel.message_builder(MSG_Types.STT, command, dumb_lp(command)))

	mouth.say("you said: " + command)
	pyglet.app.exit()
	exit(1)


initSpeech()

pyglet.app.run()
