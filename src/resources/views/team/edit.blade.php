@extends('layouts.app')

@section('title', 'チーム編集')

@section('menubar')
   チーム編集
   <div class="items">
      <a href='/team/show?id={{$form->id}}'><i class="fa fa-reply"></i>	</a>
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

   <form action="/team/edit" method="post">
  
            <div class="main-information">
               @csrf
               <input type="hidden" name="id" value="{{$form->id}}">
               <input type="hidden" name="user_id" value="{{$form->user_id}}">
               <p>チーム名：<input type="text" name="name" value="{{$form->name}}"></p>
               <p>詳細　　：<input type="text" name="information" value="{{$form->information}}"></p>
               <p>作成者　：{{$form->ownerName()}}</p>
               <p>作成日　：{{$form->created_at}}</p>
               <p>更新日　：{{$form->updated_at}}</p> 
               <input type="submit" value="編集">    
             </div>
   
   </form>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection