import django_filters
from .models import StudentProfile

class StudentProfileFilter(django_filters.FilterSet):
    studentname        = django_filters.CharFilter(field_name='studentname',lookup_expr = 'icontains')
    batch       = django_filters.CharFilter(field_name='batch', lookup_expr='iexact')
    department  = django_filters.CharFilter(field_name='department', lookup_expr='iexact')
    year        = django_filters.NumberFilter(field_name='year_of_study')
    min_cgpa    = django_filters.NumberFilter(field_name='cgpa', lookup_expr='gte')
    max_cgpa    = django_filters.NumberFilter(field_name='cgpa', lookup_expr='lte')
    
    class Meta:
        model  = StudentProfile
        fields = ['studentname','batch', 'department', 'year', 'min_cgpa', 'max_cgpa']

