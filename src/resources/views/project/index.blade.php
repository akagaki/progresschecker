@extends('layouts.helloapp')

@section('title', 'Project.index')

@section('menubar')
   プロジェクトページ
@endsection

@section('content')
   <table>
   <tr><th>Data</th></tr>
   @foreach ($items as $item)
       <tr>
           <td>{{$item->getData()}}</td>
       </tr>
   @endforeach
   </table>
@endsection

@section('footer')
copyright 2021 akagaki.
@endsection
