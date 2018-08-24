import graphene
import gqlserver.schema


class Query(gqlserver.schema.Query, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query)