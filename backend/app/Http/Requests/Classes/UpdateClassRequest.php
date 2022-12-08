<?php

namespace App\Http\Requests\Classes;

use Illuminate\Foundation\Http\FormRequest;

class UpdateClassRequest extends FormRequest
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
            'Year' => 'required',
            'Semester' => 'required',
            'Grade' => 'required',
            //'IdSubject' => 'required',
            'Type' => 'required',
            'Credit' => 'required|min:1',
            'NumberOfStudent' => 'required|min:1',
            'SubjectCoefficient' => 'required|min:1',
            //'Unit' => 'required'
        ];
    }
}
