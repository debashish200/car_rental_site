from rest_framework.permissions import BasePermission

class IsAgencyOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'agency'


class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        # Read permissions for all
        if request.method in ['GET']:
            return True
        
        # Write permissions only for owner
        return obj.owner == request.user