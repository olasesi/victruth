<?php
// app/Models/PersonalAccessToken.php
namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
// Override the token creation method to include user type
public static function createToken(array $attributes)
{
$token = parent::createToken($attributes);

// Attach user type to the token payload
$token->token->payload['admin_role_id'] = auth()->user()->admin_role_id;

return $token;
}
}