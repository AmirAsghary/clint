import json
from enum import Enum
import requests
from os import path as osPath, remove as removeFile
from hashlib import sha256
from re import split


class Types(Enum):
	INTERNAL = 1
	STT = 2


class Message:
	__blocked_words = []
	__bw_src = 'https://raw.githubusercontent.com/RobertJGabriel/Google-profanity-wors/master/list.txt'
	__bw_local_path = 'db/Google-profanity-words/list.txt'

	def __init__(self):
		def __check_file_integrity(local_src, remote_src):
			"""
			:param local_src: local txt file stored in 'self.__bw_local_path'
			:param remote_src: original txt file fetched from '__self.__bw_src'
			:return: 'True' if the files match and 'False' if otherwise.

			this Method compares original file's hash value (sha256) with current local file to verify it's integrity
			"""
			fetched_bw = str([i.decode('utf-8') for i in remote_src.splitlines()]).encode("utf-8")
			return sha256(fetched_bw).hexdigest() == sha256(str(local_src.read().splitlines()).encode('utf-8')).hexdigest()

		try:
			with open(self.__bw_local_path) as (f):
				resp = requests.get(self.__bw_src)
				if resp.status_code == 200 and not __check_file_integrity(f, resp.content):
					raise Exception('Corrupted File: {}'.format(self.__bw_local_path))

				self.__blocked_words = f.read().splitlines()

		except Exception as e:
			"""
				if app reaches here, means that the local file stored in 'self.__bw_local_path' is corrupted.
				it will attempt to download the original list, remove current corrupt file and replace it.
			"""
			print(str(e))
			self.__blocked_words = [i.decode('utf-8') for i in requests.get(self.__bw_src).content.splitlines()]

			if osPath.exists(self.__bw_local_path):
				removeFile(self.__bw_local_path)
			with open(self.__bw_local_path, "x") as (f):
				f.write('\n'.join(self.__blocked_words))
				f.close()

	def message_builder(self, msg_type, stt, keywords):
		"""
		Args:
			:param msg_type: Types.STT for handling of user interaction and
				Types.INTERNAL for other purposes
			:param stt: (Speech to Text) user's speech converted to text
			:param keywords: keywords extracted from user's speech
			:return: an Stringified JSON object containing:
					msg type, the generated text from user's speech and keywords extracted from it ("type","stt","keywords")
		"""
		if msg_type == Types.STT:
			msg = {
				"type": 2,
				"stt": self.__sanitize(stt),
				"keywords": keywords
			}
		# elif msg_type == Types.INTERNAL:
		else:
			msg = {
				"type": str(msg_type),
				"text": "RANDOM TEXT :|"
			}
		return json.dumps(msg, separators=(',', ':'))

	def __sanitize(self, text):

		"""
		Args:
			text: the text that needs to be filtered
		"""

		splitted = split('\s', text)
		for index, word in enumerate(splitted):
			if word in self.__blocked_words:
				splitted[index] = word[:1] + '@#$!%&*#!?@!$@%^@~**'[:len(word) - 2] + word[-1:]

		return ' '.join(splitted)
