class Api::V1::ProjectsController < ApplicationController
  before_action :set_project, only: %i[ show update destroy ]

  # GET /projects
  def index
    @projects = Project.page(params[:page]).per(20) 

    # filters for projects
    if params[:filter] == 'created_at'
      @projects = @projects.order(created_at: :desc)
    elsif params[:filter] == 'updated_at'
      @projects = @projects.order(updated_at: :desc)
    end

    render json: @projects
  end

  # GET /projects/1
  def show
    render json: @project
  end

  # POST /projects
  def create
    @project = Project.new(project_params)

    if @project.save
      render json: @project, status: :created, location: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /projects/1
  def update
    if @project.update(project_params)
      render json: @project
    else
      render json: @project.errors, status: :unprocessable_entity
    end
  end

  # DELETE /projects/1
  def destroy
    @project.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def project_params
      params.require(:project).permit(:title, :description, :industry, :requiredSkills, :resourceLinks, :state, :date, :teamMembers, :imageURL, :user_id)
    end
end
