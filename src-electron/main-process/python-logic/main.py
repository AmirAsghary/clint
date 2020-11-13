import speech_recognition as sr
from scripts.message_protocol import Message, Types as MSG_Types  # noqa (suppressing a weird IDE warning :\)
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
			audio = r.listen(mic, timeout=3)
	except:
		mouth.say('Are you Talking?')

	mouth.play_outro()

	command = ''

	try:
		command = r.recognize_google(audio)
		mouth.say("you said: " + command)
		print(channel.message_builder(MSG_Types.STT, command, dumb_lp(command)))
		return
	except:
		mouth.say("Couldn't Understand You!")
		print(channel.message_builder(MSG_Types.STT, "null", []))
		return


initSpeech()

exit(1)
