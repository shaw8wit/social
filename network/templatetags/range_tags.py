from django import template

register = template.Library()


@register.filter(name='giverange')
def filter_range(number):
    if number is not None:
        return range(1, number)
