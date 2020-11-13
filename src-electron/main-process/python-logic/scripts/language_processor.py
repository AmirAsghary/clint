def dumb_lp(text):
    """
        :arg
            text: a String that contains the text that needs to be processed.
        :returns
            a list containing keywords extracted from the text
    """
    keywords = []

    command_flags = ['get', 'show', 'find', 'tell', 'what', 'how']
    command_subjects = ['weather', 'joke', 'news', 'time']
    text = text.split()
    flags_found = [flg for flg in command_flags if flg in text]
    subjects_found = [sbj for sbj in command_subjects if sbj in text]

    keywords.extend(subjects_found)

    return keywords
