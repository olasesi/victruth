<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ForgetPasswordCustomer extends Mailable
{
    use Queueable, SerializesModels;
    public $email_verification_code;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($email_verification_code)
    {
        $this->email_verification_code = $email_verification_code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Password Reset Link')->markdown('emails.users.forgetpasswordcustomer');
    }
}