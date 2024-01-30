class StartupsController < ApplicationController
  before_action :set_startup, only: %i[ show update destroy ]

  # GET /startups
  def index
    @startups = Startup.all

    render json: @startups
  end

  # GET /startups/1
  def show
    render json: @startup
  end

  # POST /startups
  def create
    @startup = Startup.new(startup_params)

    if @startup.save
      render json: @startup, status: :created, location: @startup
    else
      render json: @startup.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /startups/1
  def update
    if @startup.update(startup_params)
      render json: @startup
    else
      render json: @startup.errors, status: :unprocessable_entity
    end
  end

  # DELETE /startups/1
  def destroy
    @startup.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_startup
      @startup = Startup.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def startup_params
      params.require(:startup).permit(:user_id, :name, :mission, :industry, :skill_set, :status, :elevator_pitch, :privacy)
    end
end
