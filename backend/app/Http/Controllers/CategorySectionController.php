<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CategorySection;

class CategorySectionController extends Controller
{
    public function showCategorySection(){
        $all = CategorySection::all();
 
        return response()->json(['status' => 200,
        'category_section'=> $all,
        'message'=>'Success']);
     }
 
}