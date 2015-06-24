<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Repositories\PostRepository;
use App\Services\PostService;
use Illuminate\Http\Request;

class ApiController extends Controller
{

    /**
     * @var PostRepository
     */
    private $postRepository;

    public function __construct(PostRepository $postRepository)
    {

        $this->postRepository = $postRepository;
    }

    public function index()
    {
        return $this->postRepository->all();
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(PostService $postService)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        //
    }
}
