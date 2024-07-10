@component('mail::message')
# Reset Your Password

Hello,

We received a request to reset your password. If you didn't make this request, you can ignore this email. Otherwise,
please click the button below to reset your password:

@component('mail::button', ['url' => config('app.url').'/enter-new-password/'.$email_verification_code['verification-code']])
Reset Password
@endcomponent

This link will expire in 1 hour for security reasons. If you continue to have trouble, please contact our support team.

Thank you!

Sincerely,<br>
The Victruth Team
@endcomponent
