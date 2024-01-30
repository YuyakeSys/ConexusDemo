require "test_helper"

class StartupsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @startup = startups(:one)
  end

  test "should get index" do
    get startups_url, as: :json
    assert_response :success
  end

  test "should create startup" do
    assert_difference("Startup.count") do
      post startups_url, params: { startup: { elevator_pitch: @startup.elevator_pitch, industry: @startup.industry, mission: @startup.mission, name: @startup.name, privacy: @startup.privacy, skill_set: @startup.skill_set, status: @startup.status, user_id: @startup.user_id } }, as: :json
    end

    assert_response :created
  end

  test "should show startup" do
    get startup_url(@startup), as: :json
    assert_response :success
  end

  test "should update startup" do
    patch startup_url(@startup), params: { startup: { elevator_pitch: @startup.elevator_pitch, industry: @startup.industry, mission: @startup.mission, name: @startup.name, privacy: @startup.privacy, skill_set: @startup.skill_set, status: @startup.status, user_id: @startup.user_id } }, as: :json
    assert_response :success
  end

  test "should destroy startup" do
    assert_difference("Startup.count", -1) do
      delete startup_url(@startup), as: :json
    end

    assert_response :no_content
  end
end
