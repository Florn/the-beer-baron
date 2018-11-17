from rest_framework_jwt.authentication import JSONWebTokenAuthentication


class JWTMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_view(self, request, view_func, view_args, view_kwargs):
        print('2')
        token = request.META.get('HTTP_AUTHORIZATION', '')
        if not token.startswith('JWT'):
            return
        print('3')
        jwt_auth = JSONWebTokenAuthentication()
        auth = None
        try:
            auth = jwt_auth.authenticate(request)
        except Exception:
            return
        request.user = auth[0]