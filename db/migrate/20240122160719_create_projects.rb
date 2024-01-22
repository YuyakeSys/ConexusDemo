class CreateProjects < ActiveRecord::Migration[7.0]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :description
      t.string :industry 
      t.string :required_skills
      t.string :resource_links 
      t.string :state
      t.string :image_url 
      t.date :date 
      t.string :team_members 

      t.timestamps
    end
  end
end
