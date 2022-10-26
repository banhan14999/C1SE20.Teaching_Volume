<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'username'=>'required|max:100|unique:users,Username',
            'password'=>'required|min:8',
            'idlecturer'=>'unique:users,IdLecturer',
            'firstname'=>'required',
            'lastname'=>'required',
        ];
    }
}
