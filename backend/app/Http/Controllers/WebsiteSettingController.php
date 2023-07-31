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

        if ($request->file('upload_logo')){

           $image = WebsiteSetting::where('name', 'logo')->value('value');
       
                if(File::exists($image) && $image != "/storage/assets/images/logo/logo.png") {
                    
                    File::delete($image);
             }
        
                $file_name = time().'_'.$request->upload_logo->getClientOriginalName();
                $file_path = $request->file('upload_upload')->storeAs('/storage/assets/images/logo', $file_name, 'public');
            
                $websetting = WebsiteSetting::find(2);
                $websetting->value = '/storage/assets/images/logo/'.$file_name;
                $websetting->save();
            
                   
        }

        if ($request->file('upload_fav')){

            $image = WebsiteSetting::where('name', 'fav logo')->value('value');
        
                 if(File::exists($image) && $image != "/storage/assets/images/logo/fav.png") {
                     
                     File::delete($image);
              }
         
                 $file_name = time().'_'.$request->upload_fav->getClientOriginalName();
                 $file_path = $request->file('upload_fav')->storeAs('/storage/assets/images/logo', $file_name, 'public');
             
                 $websetting = WebsiteSetting::find(3);
                 $websetting->value = '/storage/assets/images/logo/'.$file_name;
                 $websetting->save();
             
                    
         }
        
         return response()->json(['status' => 200,
         'message'=>'Success']);
         
    }

    }
}