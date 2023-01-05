<?php

namespace App\Http\Requests\Subjects;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSubjectRequest extends FormRequest
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
            'letter' => 'required | max:20 ',
            'number' => 'required | numeric',
            'subject_name' => 'required | max:200',
            'credit' => 'required | numeric | min:1',
            'type' => 'required | max:20',
        ];
    }
}
