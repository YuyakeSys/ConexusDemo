class AddDetailsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :mission, :text
    add_column :users, :status, :string
    add_column :users, :privacy, :boolean
    add_column :users, :team_member, :text
  end
end
