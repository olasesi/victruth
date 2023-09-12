<?php

namespace App\Http\Controllers;

use App\Models\Appearance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class AppearanceController extends Controller
{
    public function showAppearance(){
        $all = Appearance::all();
 
        return response()->json(['status' => 200,
        'appearance'=> $all,
        'message'=>'Success']);
     }

     public function updateAppearance(Request $request){
       
        $validator = Validator::make($request->all(), [
            'heading'=> 'nullable',
            'paragraph1'=> 'nullable',
            'paragraph2'=> 'nullable',
            'slider'=> 'nullable|image|mimes:jpeg,jpg,png|max:2048',

        ]);
 

        if($validator->fails()){
            return response()->json([
        'validator_errors'=> $validator->messages()
            ]);
        }else{  
    
        $websetting = Appearance::find(1);
        $websetting->value = $request->input('heading');
        $websetting->save();

        $websetting = Appearance::find(2);
        $websetting->value = $request->input('paragraph1');
        $websetting->save();

        $websetting = Appearance::find(3);
        $websetting->value = $request->input('paragraph2');
        $websetting->save();

         if ($request->hasFile('slider')) {
            $uploadedImage = $request->file('slider');
            $placeholderImage = '/storage/assets/images/slider/slider.jpg';
            
            $existingImage = Appearance::where('name', 'slider')->value('value');
                if ($existingImage !== $placeholderImage && File::exists(public_path($existingImage))) {
                    File::delete(public_path($existingImage));
                }
        
                $file_name = time() . '_' . $uploadedImage->getClientOriginalName();
                $file_path = $uploadedImage->storeAs('/public/assets/images/slider', $file_name);
        
                $websetting = Appearance::where('name', 'slider')->first();
                $websetting->value = '/storage/assets/images/slider/' . $file_name;
                $websetting->save();
        
                return response()->json(['message' => 'Image uploaded and updated']);
            
        } 
        
        return response()->json(['status' => 200,
        'message'=>'Success']);
}

}
}