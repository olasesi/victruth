@component('mail::message')
# Message from {{ $messages['fullname'] }}
# {{ $messages['sender_email'] }}

The body of message:

{{ $messages['message'] }}


Thanks,
{{ config('app.name') }}
@endcomponent
