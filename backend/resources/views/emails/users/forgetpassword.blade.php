@component('mail::message')
# Introduction


You can also click the button below to automatically verify and continue with the onboarding process.

@component('mail::button', ['url' => route('user.verified', ['token' => $email_verification_code['verification_string']])])
Activate account
@endcomponent


Thanks,<br>
{{ config('app.name') }}
@endcomponent
