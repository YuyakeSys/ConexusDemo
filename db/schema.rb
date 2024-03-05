# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_05_102409) do
  create_table "devise_api_tokens", force: :cascade do |t|
    t.string "resource_owner_type", null: false
    t.bigint "resource_owner_id", null: false
    t.string "access_token", null: false
    t.string "refresh_token"
    t.integer "expires_in", null: false
    t.datetime "revoked_at"
    t.string "previous_refresh_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["access_token"], name: "index_devise_api_tokens_on_access_token"
    t.index ["previous_refresh_token"], name: "index_devise_api_tokens_on_previous_refresh_token"
    t.index ["refresh_token"], name: "index_devise_api_tokens_on_refresh_token"
    t.index ["resource_owner_type", "resource_owner_id"], name: "index_devise_api_tokens_on_resource_owner"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.string "industry"
    t.string "required_skills"
    t.string "resource_links"
    t.string "state"
    t.string "image_url"
    t.date "date"
    t.string "team_members"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "skills", force: :cascade do |t|
    t.string "skill_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "startups", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name"
    t.text "mission"
    t.string "industry"
    t.text "skill_set"
    t.string "status"
    t.text "elevator_pitch"
    t.boolean "privacy"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_startups_on_user_id"
  end

  create_table "user_skills", force: :cascade do |t|
    t.integer "users_id", null: false
    t.integer "skills_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["skills_id"], name: "index_user_skills_on_skills_id"
    t.index ["users_id"], name: "index_user_skills_on_users_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "full_name"
    t.string "image_url"
    t.string "education"
    t.string "user_type"
    t.text "mission"
    t.string "status"
    t.boolean "privacy"
    t.text "team_member"
    t.integer "company_id"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "startups", "users"
  add_foreign_key "user_skills", "skills", column: "skills_id"
  add_foreign_key "user_skills", "users", column: "users_id"
end
