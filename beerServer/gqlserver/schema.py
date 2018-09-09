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


class CustomerType(DjangoObjectType):
    class Meta:
        model = models.Customer
        filter_fields = []
        interfaces = (graphene.Node, )


class CreateMessage(graphene.Mutation):
    class Input:
        message = graphene.String()

    form_errors = graphene.String()
    message = graphene.Field(lambda: MessageType)

    @staticmethod
    def mutate(self, info, message):
        print(info.context)
        if not info.context.user.is_authenticated:
            print(info.context.user)
            print('authentication error')
            return CreateMessage(form_errors=json.dumps('Please login!'))
        message = models.Message.objects.create(
            user=info.context.user, message=message)
        return CreateMessage(message=message, form_errors=None)


class CreateCustomer(graphene.Mutation):
    class Input:
        first_name = graphene.String()
        second_name = graphene.String()
        email = graphene.String()
        password = graphene.String()

    form_errors = graphene.String()
    customer = graphene.Field(lambda: CustomerType)

    @staticmethod
    def mutate(self, info, first_name, second_name, email, password):
        print(info.context)
        if not info.context.user.is_authenticated:
            print('authentication error')
            return CreateCustomer(form_errors=json.dumps('Please login!'))

        print('creating user')
        customer = models.Customer.objects.create(
            user=info.context.user,
            first_name=first_name,
            second_name=second_name,
            email=email,
            password=password)
        return CreateCustomer(customer=customer, form_errors=None)


class Mutation(graphene.AbstractType):
    create_message = CreateMessage.Field()
    create_customer = CreateCustomer.Field()


class Query(graphene.AbstractType):
    all_messages = DjangoFilterConnectionField(MessageType)
    all_customers = DjangoFilterConnectionField(CustomerType)

    def resolve_all_messages(self, info, **kwargs):
        return models.Message.objects.all()

    def resolve_all_customers(self, info, **kwargs):
        return models.Customer.objects.all()
