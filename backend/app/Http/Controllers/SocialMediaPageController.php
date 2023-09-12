<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SocialMediaPage;
use Illuminate\Support\Facades\Validator;

class SocialMediaPageController extends Controller
{
    public function showSocialMedia(){
        $all = SocialMediaPage::all();
 
        return response()->json(['status' => 200,
        'social_media'=> $all,
        'message'=>'Success']);
     }

     public function updateSocialMedia(Request $request){
       
        $validator = Validator::make($request->all(), [
            'facebook_url'=> 'nullable|url',
            'twitter_url'=> 'nullable|url',
            'instagram_url'=> 'nullable|url',
            'whatsapp_url'=> 'nullable|url',

        ]);
 

if($validator->fails()){
    return response()->json([
'validator_errors'=> $validator->messages()
    ]);
}else{
    
    $social_media = SocialMediaPage::find(1);
    $social_media->social_media_url = $request->input('facebook_url');
    $social_media->save();

    $social_media = SocialMediaPage::find(2);
    $social_media->social_media_url = $request->input('twitter_url');
    $social_media->save();

    $social_media = SocialMediaPage::find(3);
    $social_media->social_media_url = $request->input('instagram_url');
    $social_media->save();

    
    $social_media = SocialMediaPage::find(4);
    $social_media->social_media_url = $request->input('whatsapp_url');
    $social_media->save();
    
     return response()->json(['status' => 200,
     'message'=>'Success']);
     
}

}
}