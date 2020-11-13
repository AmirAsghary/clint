def dumb_lp(text):
	keywords = []

	command_flags = ['get', 'show', 'find', 'tell', 'what', 'how']
	command_subjects = ['weather', 'joke', 'news', 'time']
	text = text.split()
	flags_found = [flg for flg in command_flags if flg in text]
	subjects_found = [sbj for sbj in command_subjects if sbj in text]

	keywords.extend(subjects_found)

	return keywords
