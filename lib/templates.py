import re
from string import Template

def compile_template(template):

    patterns = [
        (r"^(\s*)p (.*)", r"\1<p>\2</p>"),
        (r"^(\s*)h1 (.*)", r"\1<h1>\2</h1>"),
        (r"^(\s*)h2 (.*)", r"\1<h2>\2</h2>"),
        (r"^(\s*)h3 (.*)", r"\1<h3>\2</h3>"),
        (r"^(\s*)h4 (.*)", r"\1<h4>\2</h4>"),
        (r"^(\s*)h5 (.*)", r"\1<h5>\2</h5>"),
        (r"^(\s*)h6 (.*)", r"\1<h6>\2</h6>"),
    ]

    def compile(template, patterns):

        result = ''

        with open(template) as t:
            for l in t:
                for m, s in patterns:
                    if re.match(m, l):
                        l = re.sub(m, s, l)
                result += l

        return result

    return compile(template, patterns)

def render_file(template, data):
    return Template(compile_template(template)).substitute(data)
