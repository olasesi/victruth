@component('mail::message')
# Welcome to Victruth!

Thank you for joining us. You're one step away from accessing all the great features.

Click the button below to automatically verify and continue with the onboarding process.

@component('mail::button', ['url' => config('app.url').'/vendor-verify-email/'.$email_verification_code['verification_string']])
Activate Account
@endcomponent

**Didn't receive the email?**

If you don't see our email in your inbox, please check your spam or junk folder.

If you encounter any issues, feel free to reach out to us using our contact.

Thanks for!<br>
The Victruth Team
@endcomponent
