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

        try:
            with open(self.__bw_local_path) as (f):
                resp = requests.get(self.__bw_src)
                fetched_bw = str([i.decode('utf-8') for i in resp.content.splitlines()]).encode("utf-8")
                if resp.status_code == 200 and not sha256(fetched_bw).hexdigest() == sha256(
                    str(f.read().splitlines()).encode('utf-8')).hexdigest():
                    raise Exception('Corrupted File: {}'.format(self.__bw_local_path))
                self.__blocked_words = f.read().splitlines()

        except Exception as e:
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
             msg_type: Types.STT for handling of user interaction and Types.INTERNAL for other purposes
             stt: (Speech to Text) user's speech converted to text
             keywords: keywords extracted from user's speech
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
