@extends('layouts.app')

@section('title', 'Delete')

@section('menubar')
   削除ページ
   <div class="items">
      <a href='/team/show?id={{$form->id}}'><i class="fa fa-reply"></i>	</a>
   </div>
@endsection

@section('content')

<div class="team-box">

   <form action="/team/del" method="post">
  
             <div class="main-information">
               @csrf
               <input type="hidden" name="id" value="{{$form->id}}">
               <p>チーム名：{{$form->name}}</p>
               <p>詳細　　：{{$form->information}}</p>
               <p>作成者　：{{$form->ownerName()}}</p>
               <p>作成日　：{{$form->created_at}}</p>
               <p>更新日　：{{$form->updated_at}}</p> 
               <input type="submit" value="削除">    
             </div>
   
   </form>
</div>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection