import graphene
from graphene_django.types import DjangoObjectType
from graphene_django.filter.fields import DjangoFilterConnectionField
from . import models
import json


class MessageType(DjangoObjectType):
    class Meta:
        model = models.Message
        filter_fields = {'message': ['icontains']}
        interfaces = (graphene.Node, )


class UserType(DjangoObjectType):
    class Meta:
        model = models.User
        filter_fields = []
        interfaces = (graphene.Node, )


class CreateMessage(graphene.Mutation):
    class Input:
        message = graphene.String()

    form_errors = graphene.String()
    message = graphene.Field(lambda: MessageType)

    @staticmethod
    def mutate(self, info, message):
        if not info.context.user.is_authenticated:
            print('14')
            return CreateMessage(form_errors=json.dumps('Please login!'))
        message = models.Message.objects.create(
            user=info.context.user, message=message)
        return CreateMessage(message=message, form_errors=None)


class CreateUser(graphene.Mutation):
    class Input:
        first_name = graphene.String()
        second_name = graphene.String()
        email = graphene.String()
        password = graphene.String()

    form_errors = graphene.String()
    newUser = graphene.Field(lambda: UserType)

    @staticmethod
    def mutate(self, info, first_name, second_name, email, password):
        if not info.context.user.is_authenticated:
            print('14')
            return CreateUser(form_errors=json.dumps('Please login!'))
        newUser = models.User.objects.create(
            user=info.context.user,
            first_name=first_name,
            second_name=second_name,
            email=email,
            password=password)
        return CreateUser(newUser=newUser, form_errors=None)


class Mutation(graphene.AbstractType):
    create_message = CreateMessage.Field()
    create_user = CreateUser.Field()


class Query(graphene.AbstractType):
    all_messages = DjangoFilterConnectionField(MessageType)
    all_users = DjangoFilterConnectionField(UserType)

    def resolve_all_messages(self, info, **kwargs):
        return models.Message.objects.all()

    def resolve_all_users(self, info, **kwargs):
        return models.User.objects.all()
