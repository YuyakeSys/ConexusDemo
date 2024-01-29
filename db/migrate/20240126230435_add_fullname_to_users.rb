class AddFullnameToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :fullname, :string
    add_column :users, :image_url, :string
    add_column :users, :education, :string
  end
end
