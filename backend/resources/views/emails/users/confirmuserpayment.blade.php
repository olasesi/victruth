@component('mail::message')
# Order Confirmation

Dear {{ $payment_verification['name'] }},

We are excited to confirm your recent order with Victruth. Your order details are as follows:

**Reference Number:** {{ $payment_verification['reference'] }}
**Order Date:** {{ $payment_verification['orders']['created_at'] }}

**Items Ordered:**
- Limo Ride: {{ $getCustomer['orders']->limo_ride == 1 ? 'Yes' : '-' }}
- Event Planners: {{ $getCustomer['orders']->event_planners == 1 ? 'Yes' : '-' }}
- Caterers: {{ $getCustomer['orders']->caterers == 1 ? 'Yes' : '-' }}
- Cakes: {{ $getCustomer['orders']->cakes == 1 ? 'Yes' : '-' }}
- Drink Suppliers: {{ $getCustomer['orders']->drink_suppliers == 1 ? 'Yes' : '-' }}
- Servers/Waiters: {{ $getCustomer['orders']->servers_waiters == 1 ? 'Yes' : '-' }}
- Makeup Artists: {{ $getCustomer['orders']->makeup_artists == 1 ? 'Yes' : '-' }}
- Venues: {{ $getCustomer['orders']->venues == 1 ? 'Yes' : '-' }}
- Hall Decorators: {{ $getCustomer['orders']->hall_decorators == 1 ? 'Yes' : '-' }}
- Phototographers: {{ $getCustomer['orders']->photographers_video == 1 ? 'Yes' : '-' }}
- Aso Ebi: {{ $getCustomer['orders']->aso_ebi == 1 ? 'Yes' : '-' }}
- Printers: {{ $getCustomer['orders']->printers == 1 ? 'Yes' : '-' }}
- Souvenirs: {{ $getCustomer['orders']->souvenirs_gifts == 1 ? 'Yes' : '-' }}


**Total Amount:** ₦{{ number_format($payment_verification['price']) }}

**This amount is for the Limo order service only. All other services aside it will be discussed. Also, damage fee has already been included. And if after the event there are no damages, you will be paid back the damage fee.
**


Your order is now being processed. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.

Thank you for choosing Victruth!

Sincerely,<br>
The Victruth Team
@endcomponent
