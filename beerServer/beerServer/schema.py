import graphene
import gqlserver.schema


class Mutation(gqlserver.schema.Mutation, graphene.ObjectType):
    pass


class Query(gqlserver.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)