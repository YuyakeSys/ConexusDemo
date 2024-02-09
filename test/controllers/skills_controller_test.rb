require "test_helper"

class SkillsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get skills_create_url
    assert_response :success
  end
end
