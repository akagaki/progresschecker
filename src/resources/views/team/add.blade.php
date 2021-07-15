@extends('layouts.app')

@section('title', '新規チーム作成')

@section('menubar',)
   新規チーム作成
   <div class="items">
      <a href='/home'><i class="fa fa-reply"></i></a>
   </div>
@endsection

@section('content')
   @if (count($errors) > 0)
   <div>
       <ul>
           @foreach ($errors->all() as $error)
               <li>{{ $error }}</li>
           @endforeach
       </ul>
   </div>
   @endif
<div class="team-box">

   <form action="/team/add" method="post">
        <div class="main-information">
            @csrf
            <input type="hidden" name="user_id" value="{{$user->id}}">
            <p>チーム名：<input type="text" name="name" value="{{old('name')}}"></p>
            <p>詳細　　：<input type="text" name="information" value="{{old('information')}}"></p>
            <p>作成者　：{{$user->name}}</p>
            <input type="submit" value="新規作成">
        </div>
   </form>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection