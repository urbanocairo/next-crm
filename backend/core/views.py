from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        print("Ricevute credenziali:", request.data)
        return super().post(request, *args, **kwargs)

class UserInfosView(APIView):
    permission_classes = []
    def get(self, request):
        user = request.user
        data = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
        }
        return Response(data)