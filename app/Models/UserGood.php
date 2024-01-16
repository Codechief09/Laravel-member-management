<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserGood extends Model
{
    use HasFactory;

    public function User() {
        return $this->belongsTo(User::class);
    }
    public function Good() {
        return $this->belongsTo(Good::class);
    }
}
