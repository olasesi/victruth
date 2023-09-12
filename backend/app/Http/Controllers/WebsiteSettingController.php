<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WebsiteSetting;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class WebsiteSettingController extends Controller
{
    public function showWebsiteSetting(){
       $all = WebsiteSetting::all();

       return response()->json(['status' => 200,
       'website_setting'=> $all,
       'message'=>'Success']);
    }

    public function updateWebsiteSetting(Request $request){
       
            $validator = Validator::make($request->all(), [
                'website_name'=> 'nullable',
                'meta_description'=> 'nullable',
                'upload_logo'=> 'nullable|image|mimes:jpeg,jpg,png|max:2048',
                'upload_fav'=> 'nullable|image|mimes:jpeg,jpg,png|max:2048',
                'address'=> 'nullable',
                'email'=> 'nullable|email',
                'email2'=> 'nullable|email',
                'phone'=> 'nullable|numeric',
                'phone2'=> 'nullable|numeric',

            ]);
     

    if($validator->fails()){
        return response()->json([
    'validator_errors'=> $validator->messages()
        ]);
    }else{
        
        $websetting = WebsiteSetting::find(1);
        $websetting->value = $request->input('website_name');
        $websetting->save();

        $websetting = WebsiteSetting::find(4);
        $websetting->value = $request->input('meta_description');
        $websetting->save();

        $websetting = WebsiteSetting::find(5);
        $websetting->value = $request->input('address');
        $websetting->save();

        $websetting = WebsiteSetting::find(6);
        $websetting->value = $request->input('email');
        $websetting->save();

        $websetting = WebsiteSetting::find(7);
        $websetting->value = $request->input('email2');
        $websetting->save();

        $websetting = WebsiteSetting::find(8);
        $websetting->value = $request->input('phone');
        $websetting->save();

        $websetting = WebsiteSetting::find(9);
        $websetting->value = $request->input('phone2');
        $websetting->save();
        

        if ($request->hasFile('upload_logo')) {
            $uploadedImage = $request->file('upload_logo');
            $placeholderImage = '/storage/assets/images/logo/logo.png';
            
            $existingImage = WebsiteSetting::where('name', 'logo')->value('value');
                if ($existingImage !== $placeholderImage && File::exists(public_path($existingImage))) {
                    File::delete(public_path($existingImage));
                }
        
                $file_name = time() . '_' . $uploadedImage->getClientOriginalName();
                $file_path = $uploadedImage->storeAs('/public/assets/images/logo', $file_name);
        
                $websetting = WebsiteSetting::where('name', 'logo')->first();
                $websetting->value = '/storage/assets/images/logo/' . $file_name;
                $websetting->save();
        
                return response()->json(['message' => 'Image uploaded and updated']);
            
        } 
         
        
        if ($request->hasFile('upload_fav')){
            $uploadedImage = $request->file('upload_fav');
            $placeholderImage = '/storage/assets/images/logo/fav.png';
            
            $existingImage = WebsiteSetting::where('name', 'fav logo')->value('value');

            if ($existingImage !== $placeholderImage && File::exists(public_path($existingImage))) {
                File::delete(public_path($existingImage));
            }  
            
            $file_name = time() . '_' . $uploadedImage->getClientOriginalName();
            $file_path = $uploadedImage->storeAs('/public/assets/images/logo', $file_name);
            
            $websetting = WebsiteSetting::where('name', 'fav')->first();
            $websetting->value = '/storage/assets/images/logo/' . $file_name;
            $websetting->save();
    
            return response()->json(['message' => 'Image uploaded and updated']);
             
                    
         }

      
        
         return response()->json(['status' => 200,
         'message'=>'Success']);
         
    }

    }
}