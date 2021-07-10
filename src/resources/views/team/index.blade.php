@extends('layouts.app')

@section('title', 'Index')

@section('menubar',)
     チーム一覧
     
@endsection

@section('content')
    <!-- TeamTable -->
    <button> <a href='team/add'>新規チーム作成</a></button>
    <button> <a href='team/find'>検索</a></button>
   @foreach ($items as $item)
   <table>
   <tr>
       <th>チーム名</th><th>詳細</th><th>作成者</th><th></th><th></th><th></th>
   </tr>
   
       <tr>
           <td>{{$item->name}}</td>
           <td>{{$item->information}}</td>
           <td>{{$item->ownerName()}}</td>
           <td><button> <a href='/team/edit?id={{$item->id}}'>編集</a></button></td>
           <td><button> <a href='/team/del?id={{$item->id}}'>削除</a></button></td>
           <td><button><a href='project/add?id={{$item->id}}''>新規プロジェクト作成</a></button></td>

       </tr>
            <!-- ProjectTable -->
        @if ($item->projects != null)
            @foreach ($item->projects as $obj)
                <tr>
                    <th>プロジェクト名</th><th>詳細</th><th>作成者</th><th></th><th></th><th></th>
                </tr>
                    <tr>
                        <td>{{$obj->name}}</td>
                        <td>{{$obj->information}}</td>
                        <td>{{$obj->ownerName()}}</td>
                        <td><button> <a href='/project/edit?id={{$obj->id}}'>編集</a></button></td>
                        <td><button> <a href='/project/del?id={{$obj->id}}'>削除</a></button></td>
                        <td><button><a href='task/add?id={{$obj->id}}''>新規タスク作成</a></button></td>
                        
                    </tr>
                    <!-- TaskTable -->
                    
                    
                    @foreach ($tasks as $task_obj)
                        @if ($obj->id == $task_obj->project_id )
                        <tr>
                            <th>タスク名</th><th>詳細</th><th>作成者</th><th>進捗</th><th>期日</th><th></th><th></th>
                        </tr>
                        <tr>
                            <td>{{$task_obj->name}}</td>
                            <td>{{$task_obj->information}}</td>
                            <td>{{$task_obj->user_id}}</td>
                            <td>{{$task_obj->progress}}</td>
                            <td>{{$task_obj->deadline}}</td>

                            <td><button> <a href='/task/edit?id={{$task_obj->id}}'>編集</a></button></td>
                            <td><button> <a href='/task/del?id={{$task_obj->id}}'>削除</a></button></td>
                        </tr>
                        @endif
                @endforeach 
            @endforeach    
        @endif
    </table>
    <supace>　</supace>
   @endforeach
   <!-- TaskTable -->
     <!-- <table>
                    <tr>
                        <th>タスク名</th><th>詳細</th><th>作成者</th><th>プロジェクト</th><th>進捗</th><th>期日</th><th></th><th></th>
                    </tr>
                            @foreach ($tasks as $task_obj)
                                <tr>
                                    <td>{{$task_obj->name}}</td>
                                    <td>{{$task_obj->information}}</td>
                                    <td>{{$task_obj->user_id}}</td>
                                    <td>{{$task_obj->project_id}}</td>
                                    <td>{{$task_obj->progress}}</td>
                                    <td>{{$task_obj->deadline}}</td>

                                    <td><button> <a href='/task/edit?id={{$task_obj->id}}'>編集</a></button></td>
                                    <td><button> <a href='/task/del?id={{$task_obj->id}}'>削除</a></button></td>
                                </tr>
                            @endforeach    
    </table>                     -->

@endsection

@section('footer')
copyright 2021 akagaki.
@endsection