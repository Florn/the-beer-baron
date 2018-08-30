import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter.fields import DjangoFilterConnectionField
from . import models


class MessageType(DjangoObjectType):
    class Meta:
        model = models.Message
        filter_fields = {'message': ['icontains']}
        interfaces = (graphene.Node, )


class Query(graphene.AbstractType):
    all_messages = DjangoFilterConnectionField(MessageType)

    def resolve_all_messages(self, args, context, info):
        return models.Message.objects.all()
