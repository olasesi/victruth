<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WebsiteSetting;

class WebsiteSettingController extends Controller
{
    public function showWebsiteSetting(){
       $all = WebsiteSetting::all();

       return response()->json(['status' => 200,
       'website_setting'=> $all,
       'message'=>'Success']);
    }
}